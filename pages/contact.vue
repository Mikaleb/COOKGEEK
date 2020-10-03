<template>
  <div>
    <v-alert outlined type="success" text v-if="validated">
      {{ $t('contact.validated') }}
    </v-alert>
    <v-card class="mb-6">
      <v-card-title>{{ $t('contact.title') }}</v-card-title>
      <v-card-text>
        <v-form ref="myForm" v-model="valid" lazy-validation v-cloak>
          <v-text-field
            v-model="subject"
            :rules="subjectRules"
            :label="$t('contact.subject')"
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            :label="$t('contact.name')"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :label="$t('contact.mail')"
            required
          ></v-text-field>

          <v-textarea
            filled
            v-model="content"
            class="mt-4"
            v-cloak
            :rules="contentRules"
            :label="$t('contact.content')"
          ></v-textarea>

          <vue-hcaptcha
          sitekey="67d012d3-6c25-417f-a031-705c0f57fd2b"
          @verify="checkCaptcha"
        ></vue-hcaptcha>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mt-4 mr-4"
            @click="validate"
            >{{ $t('contact.validate') }}</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch, computed } from '@nuxtjs/composition-api'

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
    const validated = ref(false)

    const subject = ref('')
    const name = ref('')
    const email = ref('')
    const content = ref('')

    const emailRules = [
      (v: any) => !!v || 'E-mail is required',
      (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]

    const subjectRules = [(v: any) => !!v || 'Subject is required']
    const nameRules = [(v: any) => !!v || 'Name is required']
    const contentRules = [(v: any) => !!v || 'Content is required']

    const checkCaptcha = (response: any) => {
       captcha.value = response ? true : false
    }

    const mailContent = computed(() => {
      return `Mail : ${email.value}, Content : ${content.value}`
    })

    const validate = async () => {
      console.log('in validate !')
      myForm.value.validate()
      if (captcha.value === true) {
      console.log('sending !')
      const { data, status } = await ctx.root.$axios.$post('/mail/send', {
        from: 'triplaner@outlook.com',
        subject: subject.value,
        text: mailContent.value,
        to: 'triplaner@outlook.com',
      })
      validated.value = true
      }
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
      validated,
    }
  },
})
</script>
