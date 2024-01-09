import { BlackEmailIcon, BlackUserIcon, PasswordEye, PasswordLock } from "../images";

const SignUpData = [
    {
        label: "First Name",
        type: "text",
        icons: [BlackUserIcon]
    },
    {
        label: "Last Name",
        type: "text",
        icons: [BlackUserIcon]
    },
    {
        label: "Email",
        type: "email",
        icons: [BlackEmailIcon]
    },
    {
        label: "Password",
        type: "password",
        icons: [PasswordLock, PasswordEye]
    },
]


export default SignUpData;