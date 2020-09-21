<template>
  <v-card class="mb-6">
    <v-card-title>Contact</v-card-title>
    <v-card-text>
      <v-form ref="myForm" v-model="valid" lazy-validation v-cloak>
        <v-text-field
          v-model="subject"
          :rules="subjectRules"
          :label="$t('contact.subject')"
          required
        ></v-text-field>
        <v-text-field v-model="name" :label="$t('contact.name')" :rules="nameRules" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" :label="$t('contact.mail')" required></v-text-field>

        <v-textarea
          filled
          v-model="content"
          class="mt-4"
          v-cloak
          :rules="contentRules"
          :label="$t('contact.content')"
        ></v-textarea>

        <vue-hcaptcha sitekey="997baa07-065b-43cd-b65a-38f490853fd7" @verify="checkCaptcha"></vue-hcaptcha>

        <v-btn
          :disabled="!valid"
          color="primary"
          class="mt-4 mr-4"
          @click="validate"
        >{{$t('contact.validate')}}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Contact',
  head() {
    return {
      title: 'Contact',
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, ctx) {
    const myForm: any = ref(null)
    const captcha = ref(false)
    const valid = ref(false)

    const subject = ''
    const name = ''
    const email = ''

    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]

    const subjectRules = [(v: any) => !!v || 'Subject is required']
    const nameRules = [(v: any) => !!v || 'Name is required']
    const contentRules = [(v: any) => !!v || 'Content is required']

    const content = null

    const checkCaptcha = (response: any) => {
      captcha.value = response ? true : false
    }

    const validate = () => {
      console.log('in validate !')
      myForm.value.validate()
      console.log('sending !')
      ctx.root.$axios.$post('/mail/send', {
        from: 'John Doe',
        subject: 'Incredible',
        text: 'This is an incredible test message',
        to: 'mikaleb@live.fr',
      })
      console.log('sent !')
    }

    watch(
      () => captcha.value,
      (newV, prevV) => {
        console.log('setup -> newV', newV)
        valid.value = newV === true ? true : false
      }
    )

    return {
      captcha,
      checkCaptcha,
      valid,
      subject,
      name,
      email,
      emailRules,
      nameRules,
      subjectRules,
      contentRules,
      content,
      validate,
      myForm,
    }
  },
})
</script>
