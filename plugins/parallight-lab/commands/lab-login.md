---
name: lab-login
description: 登录 Parallight Lab（邮箱 + 4 位个人 PIN）
---

<!-- AUTO-GENERATED from commands-src/lab-login.md — do not edit. Run `pnpm gen:commands`. -->

帮学员登录 Parallight Lab。

**如果 `$ARGUMENTS` 里包含 `--otp`**，走末尾的「邮箱验证码兜底流程」。否则走下面的
PIN 流程（默认）。

## PIN 流程（默认）

1. 拿到学员邮箱。如果 `$ARGUMENTS` 里已经是邮箱就用它；否则问学员（邮箱是自由输入，不用选项卡）。
2. 调 `auth_pin_lookup`，把邮箱传进去。**按它返回的话分支，不要自作主张**：
   - 说「没有找到课程记录」→ 把这句话原样告诉学员，**到此为止，不要问 PIN**。
   - 说「还没有个人 PIN / 去设置页」→ 把设置页地址原样给学员，让他打开看自己的 4 位 PIN，
     **等他拿到之后再继续**。
   - 说「邮箱确认无误，请输入 PIN」→ 进下一步。
3. 问学员他的 4 位 PIN（自由输入，不用选项卡）。
4. 调 `auth_pin_login` 完成登录。
5. 登录成功后提示学员可以用 /lab 看可用 lab。

**上面任何一步报错**（`auth_pin_lookup` 或 `auth_pin_login`），都把错误原样告诉学员 —— 里面已经写清了还剩几次、锁到什么时候、以及可以怎么办（比如改用 `--otp`）。别假装成功，也别自己编一套说法，更不要把报错硬归类成上面三种情况之一。

学员说「忘了 PIN」→ 让他去 https://agentist.org/lab/home/settings 看，那里也能改。

## 邮箱验证码兜底流程（`--otp`）

PIN 连错太多被锁、或者学员就是想用验证码时走这条。这条路不受 PIN 锁影响。

1. 拿到学员邮箱。
2. 调 `auth_request_otp` 发送验证码到该邮箱。
3. 告诉学员去邮箱收 6 位验证码（**记得提醒看垃圾邮件箱**），问他收到的码（自由输入）。
4. 调 `auth_complete_otp` 完成登录。
5. 登录成功后提示学员可以用 /lab 看可用 lab。

如果任何一步报错，把错误原样告诉学员，别假装成功。
