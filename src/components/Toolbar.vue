<template>
    <div id="toolbar">
      <v-layout align-center justify-center>
        <v-container>
          <v-layout>
            <v-flex>
              <v-toolbar
              :fixed="isFixed">
                <v-toolbar-side-icon
                  v-if="!isFixed"
                  @click.stop="drawer = !drawer">
                </v-toolbar-side-icon>
                <v-btn flat id="toolbarHomeBtn" v-if="isFixed">
                  <router-link to="/"><v-icon>headset</v-icon>UBeat</router-link>
                </v-btn>
                <v-spacer v-if="isFixed"></v-spacer>
                <v-text-field
                  id="searchField"
                  solo
                  flat
                  hide-details
                  placeholder="Search">
                </v-text-field>
                <v-btn icon>
                  <v-icon>clear</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>search</v-icon>
                </v-btn>
                <v-spacer v-if="isFixed"></v-spacer>
                <desktopToolbarItems :is-fixed="isFixed"/>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </div>
</template>

<script>
  import DesktopToolbarItems from './DesktopToolbarItems';

  export default {
    name: 'Toolbar',
    components: { DesktopToolbarItems },
    data() {
      return {
        isFixed: true,
        inputIsSelected: false,
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.isFixed = window.innerWidth > 1024;
        });
        document.getElementById('searchField').onfocus = function isSelected() {
          this.inputIsSelected = true;
        };
      });
    },
  };
</script>

