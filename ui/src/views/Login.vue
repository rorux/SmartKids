<template>
  <div class="row">
    <div class="col s12">
      <Form
        class="card auth-card"
        @submit="submitLogin"
        :validation-schema="schema"
      >
        <div class="card-content">
          <span class="card-title">Вход в личный кабинет</span>

          <div class="input-field">
            <Field
              id="login"
              v-model.trim="login"
              name="login"
              v-slot="{ meta, field, errors }"
            >
              <input
                v-bind="field"
                type="text"
                :class="{
                  invalid:
                    (meta.dirty && !meta.valid && login.length) ||
                    (errors.length && !login.length),
                }"
              />
              <label for="login">Логин</label>
              <small class="helper-text" v-if="meta.valid && meta.dirty"
                >✅ Поле заполнено корректно</small
              >
              <small
                class="helper-text invalid"
                v-else-if="meta.dirty && !meta.valid && login.length"
                >⛔️ Длина пароля от 3 до 10 символов (сейчас символов:
                {{ login.length }})</small
              >
              <small
                class="helper-text invalid"
                v-else-if="errors.length && !login.length"
                >⛔️ Введите логин!</small
              >
            </Field>
          </div>
          <div class="input-field">
            <Field
              id="password"
              v-model.trim="password"
              name="password"
              v-slot="{ meta, field, errors }"
            >
              <input
                v-bind="field"
                type="password"
                :class="{
                  invalid:
                    (meta.dirty && !meta.valid && password.length) ||
                    (errors.length && !password.length),
                }"
              />
              <label for="password">Пароль</label>
              <small class="helper-text" v-if="meta.valid && meta.dirty"
                >✅ Поле заполнено корректно</small
              >
              <small
                class="helper-text invalid"
                v-else-if="meta.dirty && !meta.valid && password.length"
                >⛔️ Длина пароля от 3 до 20 символов (сейчас символов:
                {{ password.length }})</small
              >
              <small
                class="helper-text invalid"
                v-else-if="errors.length && !password.length"
                >⛔️ Введите пароль!</small
              >
            </Field>
          </div>
        </div>
        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Войти
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import messages from "@/utils/messages";

export default {
  data() {
    const login = "";
    const password = "";
    const schema = yup.object({
      login: yup.string().required().min(3).max(10),
      password: yup.string().required().min(3).max(20),
    });

    return {
      schema,
      login,
      password,
    };
  },
  methods: {
    async submitLogin(data) {
      try {
        await this.$store.dispatch("login", data);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
    async submitRegister(data) {
      try {
        await this.$store.dispatch("register", data);
        this.$router.push("/login");
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    Field,
    Form,
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>
