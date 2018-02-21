<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>

            <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile avatar v-else-if="item.action" :key="item.title" @click="item.action">
              <v-list-tile-avatar>
                <v-icon>{{item.avatar}}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Raven from 'raven-js'
export default {
    data() {
        return { 
            items: [
                { header: 'Sentry Demo' },
                { action: this.throw, avatar: 'mdi-alert', title: 'Throw', subtitle: "Throw a javascript exception" },
                { divider: true, inset: true },
                { action: this.console, avatar: 'mdi-console', title: 'Console', subtitle: "write some things to the browser's console" },
                { divider: true, inset: true },
                { action: this.breadcrumb, avatar: 'mdi-dots-horizontal-circle', title: 'Breadcrumb', subtitle: "Write a sentry breadcrumb" },
                { divider: true, inset: true },
                { action: this.dialog, avatar: 'mdi-message-alert', title: 'Feedback', subtitle: "Get some feedback from the user using sentry's OOB thing" }
            ]
        }
    },
    methods: {
        /**
         * 
         */
        breadcrumb() {
            Raven.captureBreadcrumb({
                message: 'some random test breadcrumb',
                category: 'sentry-demo-category',
                data: {
                    user: 'some.username'
                }
            })
        },
        /**
         * 
         */
        throw() { 
            throw new Error('some test error thrown in the browser')
        },
        /**
         * 
         */
        console() {
            console.log('test logging some message to the browser console...')
        },
        /**
         * 
         */
        dialog() {
            let eventId = Raven.lastEventId()
            Raven.showReportDialog({
                    eventId: eventId,

                    // use the public DSN (dont include your secret!)
                    dsn: 'https://d053eaee170e4233a057ef1e9221f890@sentry.io/291945'
                })
        }
    }
}
</script>