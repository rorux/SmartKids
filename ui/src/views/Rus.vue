<template>
  <div>
    <Modal v-model="newLevel" />
    <Modal v-if="!newLevel" v-model="modal" />
    <Modal
      v-model="levelDescribe"
      @levelDescribeNull="levelDescribe = $event"
    />
    <main class="app-content" :class="{ full: !modelValue }">
      <div class="app-page">
        <div>
          <div class="page-title">
            <h3>Русский язык</h3>
            <button class="btn btn-small" @click="levelDescribeCalc">
              Уровень {{ level }}
            </button>
          </div>

          <div class="row" v-if="!taskAvailable">
            <SubjectStat />
          </div>

          <div class="task-wrap" v-if="taskAvailable">
            <h6 class="center">
              {{ getTask.expression[0] }}
            </h6>
            <div class="row">
              <div class="col s12">
                <div class="card-panel teal lighten-5">
                  <p v-if="getTask.expression[3]" class="center">
                    <img
                      :src="getTask.expression[3]"
                      style="max-height: 250px"
                      class="responsive-img"
                    />
                  </p>
                  <p
                    class="task black-text flow-text center-align"
                    v-else-if="getTask.expression[2]"
                  >
                    {{ getTask.expression[1] }} -
                    <span> {{ getTask.expression[2] }} </span>
                  </p>
                  <p class="task black-text flow-text center-align" v-else>
                    {{ getTask.expression[1] }}
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <Form
                class="col s12 m8 offset-m2"
                @submit="submitAnswer"
                :validation-schema="schema"
              >
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">edit</i>
                    <Field
                      id="answer"
                      v-model.trim="answer"
                      name="answer"
                      v-slot="{ meta, field, errors }"
                    >
                      <input
                        v-bind="field"
                        type="text"
                        :class="{
                          invalid:
                            (meta.dirty && !meta.valid && answer.length) ||
                            (errors.length && !answer.length),
                        }"
                      />
                      <label for="answer">Ответ</label>
                      <small
                        class="helper-text invalid"
                        v-if="meta.dirty && !meta.valid && answer.length"
                        >⛔️ Введите буквы!</small
                      >
                      <small
                        class="helper-text invalid"
                        v-else-if="errors.length && !answer.length"
                        >⛔️ Введите ответ!</small
                      >
                    </Field>
                    <button
                      class="btn-large waves-effect waves-light auth-submit"
                      type="submit"
                    >
                      Ответить
                      <i class="material-icons right">check</i>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="fixed-action-btn" title="Новое задание" @click="task">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import SubjectStat from "@/components/SubjectStat";
import { mapGetters, mapActions } from "vuex";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  name: "rus",
  props: ["modelValue"],
  data() {
    const answer = "";
    const schema = yup.object({
      answer: yup.string().required(),
    });
    const resTask = "";
    const modal = null;
    const newLevel = null;
    const levelDescribe = null;
    const stat = {};
    const loading = true;

    return {
      answer,
      schema,
      resTask,
      modal,
      newLevel,
      levelDescribe,
      stat,
      loading,
    };
  },
  computed: {
    subject() {
      const subjects = Object.assign({}, { ...this.getInfo.subjects });
      if (subjects[this.$route.name]) {
        return subjects[this.$route.name];
      } else {
        return {};
      }
    },
    level() {
      const subjects = Object.assign({}, { ...this.getInfo.subjects });
      if (subjects[this.$route.name]) {
        return subjects[this.$route.name].progress.length;
      } else {
        return 0;
      }
    },
    taskAvailable() {
      return Object.keys(this.getTask).length !== 0 ? true : false;
    },
    ...mapGetters(["getInfo", "getTask", "getNewLevel"]),
  },
  watch: {
    getNewLevel(value) {
      this.newLevel = value;
    },
  },
  methods: {
    async task() {
      const taskReq = {
        level: this.level,
        token: localStorage.getItem("token"),
        sub: this.$route.name,
      };
      await this.createTask(taskReq);
      this.modal = null;
    },
    async submitAnswer() {
      try {
        const result =
          this.answer.toLowerCase() === this.getTask.answer.toLowerCase()
            ? "correct"
            : "wrong";
        const reqTaskDb = {
          token: localStorage.getItem("token"),
          sub: this.$route.name,
          req: {
            result: result,
            type: this.getTask.type,
            date: new Date(),
            level: this.level,
          },
        };
        // добавление ответа в БД
        await this.addTaskDb(reqTaskDb);

        this.modal = result;
        this.answer = "";
      } catch (e) {
        console.log(e);
      }
    },
    levelDescribeCalc() {
      this.levelDescribe = this.$route.name;
    },
    ...mapActions(["createTask", "addTaskDb", "checkToken", "getStatDb"]),
  },
  components: {
    Field,
    Form,
    Modal,
    SubjectStat,
  },
  beforeUnmount() {
    this.$store.commit("clearTask");
  },
};
</script>

<style lang="scss" scoped>
.task-wrap {
  h6 {
    font-size: 1.4rem;
  }
}
.task {
  font-size: 2vw;
  margin: 10px 0;
  span {
    font-size: 3vw;
    font-weight: 600;
    text-transform: uppercase;
    margin: 10px 0;
  }
}
@media (max-width: 600px) {
  .task {
    font-size: 5vw;
    span {
      font-size: 6vw;
    }
  }
}
label {
  width: 70px !important;
}
.auth-submit {
  margin-top: 20px;
}
</style>
