import { Auth } from "lib/auth";
import { User } from "lib/users";
import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";
import { Resend } from "resend";
import { sendEmail } from "lib/resend";

const resend = new Resend("re_a97C78X3_9bD8LHD4eEHLTtHRuygMZKSZ");

var seed = "aasd";
var random = gen.create(seed);

export async function findOrCreate(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    console.log("auth encontrado");

    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreate(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const fiveMinutes = addMinutes(now, 5);
  auth.data.code = code;
  auth.data.expires = fiveMinutes;
  await auth.push();
  // const envioEmail = await sendEmail(email, code.toString());
  console.log(email, code);
  
  return true;
}
