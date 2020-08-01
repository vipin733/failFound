<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <b-card class="mb-2  p-2">
                <b-card-text>
                    <form class="needs-validation" novalidate>
                        <div class="form-row">
                            <div class="col-md-12 text-center">
                                <p class="h3">Share you amazing story</p> <br>
                            </div>
                           
                            <div class="col-md-12">
                                <input type="text" class="form-control" placeholder="title" id="validationCustom01" required>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                             <div class="col-md-12">
                                <div class="mb-3">
                                    <textarea class="form-control" id="validationTextarea" placeholder="story" required></textarea>
                                    <div class="invalid-feedback">
                                        Please enter a message in the textarea.
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-12">
                                <br>
                            </div>

                            <div class="col-md-12 text-center">
                                <b-button block variant="primary">Share Story</b-button>
                            </div>

                        </div>
                    </form>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    push(route) {
      this.$router.push(route)
    }
  }
};
</script>