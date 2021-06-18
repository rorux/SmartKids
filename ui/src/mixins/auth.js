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
}