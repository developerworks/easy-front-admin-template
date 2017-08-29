<template>
  <div class="login">
    <Row class="vm-login vm-panel">
      <Col span="10" class="login-form">
        <div class="login-header">
          <img src="../assets/images/logo.png" height="80" alt="">
          <p><span>ES </span>MANAGER</p>
        </div>
        <div class="login-form">
          <Form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
            <Form-item prop="username">
              <Input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
              </Input>
            </Form-item>
            <Form-item prop="password">
              <Input size="large" type="password" v-model="formLogin.password" placeholder="密码">
              </Input>
            </Form-item>
            <Form-item class="login-no-bottom">
              <Checkbox-group v-model="formLogin.remember">
                <Checkbox label="记住密码" name="remember"></Checkbox>
              </Checkbox-group>
            </Form-item>
            <Form-item class="login-no-bottom">
              <Row>
                <Col>
                  <Button type="primary" @click="handleSubmit">登录</Button>
                </Col>
              </Row>
            </Form-item>
          </Form>
        </div>
      </Col>
      <Col span="14" class="login-ad">
        <span class="photo-author">Author: JoneQian</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formLogin: {
          username: '',
          password: '',
          remember: []
        },
        formLoginRules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.formLogin.validate(async (valid) => {
          if (valid) {
            try {
              await this.$store.dispatch('login', {
                username: this.formLogin.username,
                password: this.formLogin.password
              });
              if (this.formLogin.remember[0] === '记住密码') {
                sessionStorage.setItem('username', JSON.stringify(this.formLogin.username));
                sessionStorage.setItem('password', JSON.stringify(this.formLogin.password));
              } else {
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('password');
              }
              this.formLogin.username = '';
              this.formLogin.password = '';
              this.$router.push({path: '/'});
            } catch (e) {
              this.$Message.error(e.message);
            }
          } else {
            this.$Message.error('登录信息验证失败!');
          }
        });
      },
      formLoginReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {
      if (sessionStorage.getItem('username')) {
        this.formLogin.username = JSON.parse(sessionStorage.getItem('username'));
      }
      if (sessionStorage.getItem('password')) {
        this.formLogin.password = JSON.parse(sessionStorage.getItem('password'));
      }
    }
  };
</script>

<style scoped>
</style>
