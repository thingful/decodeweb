<template>
  <div>
    <div class="row">
      <b-form @submit="onSubmit" @reset="OnReset">
        <b-form-group
          id="device-token-group"
          label="Device token:"
          label-for="device"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="device-token"
            v-model="form.deviceToken"
            type="text"
            required
            placeholder="Enter device token"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>
