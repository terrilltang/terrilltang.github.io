var Article = {
  template: `<article>
      <span v-if="loading">{{loading}}</span>
      <h1>{{$route.params.id}}</h1>
      <detail v-if="post" v-html="post" class="markdown"></detail>
    </article>`,
  data: function () {
    return {
      loading: true,
      post: null
    }
  },
  watch: {
    '$route': 'fetchData',
  },
  created() {
    this.fetchData();
  },
  updated() {
    document.title=this.$route.params.id;
    document.querySelectorAll('pre code').forEach(function (block) {
      hljs.highlightBlock(block);
    })
  },
  methods: {
    fetchData() {
      var self = this;
      self.post = null
      self.loading = true
      axios.get('./html/' + this.$route.params.id + '.html')
        .then(function (res) {
          self.loading = false
          self.post = res.data;

        }).catch(function (err) {
          console.log(err)
        })
    }
  }

}
var Home = {
  template: '<h2>Welcome to Terrill\'s Personal Tech Blog!</h2>'
}
var About = {
  template: '<h2>about me</h2>'
}
var NotFound = {
  template: '<h3>Nothing Here! <a href="/">go to home</a></h3>'
}

var routes = [{
    path: '/:id?.html',
    component: Article,
  }, {
    path: '/about',
    component: About
  }, {
    path: '',
    component: Home
  }, {
    path: '**',
    component: NotFound
  }

]

var router = new VueRouter({
  routes,
})

var app = new Vue({
  data: {
    showMenu: true
  },
  methods: {
    toggleMenu(event) {
      event.preventDefault();
      this.showMenu = !this.showMenu;
      console.log(this.showMenu)
    }
  },
  router
}).$mount('main')