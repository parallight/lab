---
name: lab-login
description: 登录 Parallight Lab（邮箱 + 6 位验证码 OTP）
---

<!-- AUTO-GENERATED from commands-src/lab-login.md — do not edit. Run `pnpm gen:commands`. -->

帮学员登录 Parallight Lab。流程：

1. 拿到学员邮箱。如果 `$ARGUMENTS` 里已经是邮箱就用它；否则问学员（邮箱是自由输入，不用选项卡）。
2. 调 `auth_request_otp` 发送验证码到该邮箱。
3. 告诉学员去邮箱收 6 位验证码，问他收到的码（自由输入）。
4. 调 `auth_complete_otp` 完成登录。
5. 登录成功后提示学员可以用 /lab 看可用 lab。

如果任何一步报错，把错误原样告诉学员，别假装成功。
