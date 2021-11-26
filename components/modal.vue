<template>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          height="120"
          v-bind="attrs"
          v-on="on"
        >
          <div>
            <v-icon
              size="24"
              color="myblue"
              class="my-2"
            >
              mdi-plus
            </v-icon>
            <div class="caption myblue--text">
              プロジェクトを追加
            </div>
          </div>
        </v-btn>
      </template>

      <v-card>
        <v-text-field
          label="Project Name"
        >
        </v-text-field>
      </v-card>


    </v-dialog>

</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>