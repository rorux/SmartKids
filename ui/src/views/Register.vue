<template>
  <Form
    class="card auth-card"
    @submit="submitRegister"
    :validation-schema="schema"
  >
    <div class="card-content">
      <span class="card-title">Дошкольные занятия для детей</span>

      <div class="input-field">
        <Field
          id="login"
          v-model.trim="username"
          name="username"
          v-slot="{ meta, field, errors }"
        >
          <input
            v-bind="field"
            type="text"
            :class="{
              invalid:
                (meta.dirty && !meta.valid && username.length) ||
                (errors.length && !username.length),
            }"
          />
          <label for="username">Имя</label>
          <small class="helper-text" v-if="meta.valid && meta.dirty"
            >✅ Поле заполнено корректно</small
          >
          <small
            class="helper-text invalid"
            v-else-if="meta.dirty && !meta.valid && username.length"
            >⛔️ Длина поля от 2 до 20 символов (сейчас символов:
            {{ username.length }})</small
          >
          <small
            class="helper-text invalid"
            v-else-if="errors.length && !username.length"
            >⛔️ Введите имя!</small
          >
        </Field>
      </div>

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
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </Form>
</template>

<script>
import auth from "@/mixins/auth";
import * as yup from "yup";

export default {
  mixins: [auth],

  data() {
    const username = "";
    const schemaWithName = yup.object({
      username: yup.string().required().min(2).max(20),
    });
    this.schema = this.schema.concat(schemaWithName);

    return {
      username,
    };
  },
};
</script>