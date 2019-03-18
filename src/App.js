import axios from 'axios';

export default {
  el: "#app",
  data () {
    return {
      current: null,
      page: 0,
      posts: [],
      createTitle: '',
      createBody: '',
      visiblePostID: '',
      }
    },
    watch: {
      counter: function(newValue, oldValue) {
        this.getData()
      }

    },
    created(){
      this.getData()
    },
    computed: {
      evenPosts: function(posts){
        return Math.ceil(this.posts.length/10);
      },
      paginatedData() {
        const start = this.page * 10;
        const end = start + 10;
        return this.posts.slice(start, end);
      }
    },
    methods: {
    setCurrent: function(id) {
      this.current = id;
    },
    getData() {
      axios.get(`https://jsonplaceholder.typicode.com/posts`).then(response => {
        this.posts = response.data
      })
    },
    deleteData(index, id) {
      axios.delete('http://jsonplaceholder.typicode.com/posts/' + id)
          .then(response => {
            console.log('delete')
              this.posts.splice(index, 1);
            })
            .catch(function(error) {
              console.log(error)
            })
          },
          addPost() {
            axios.post('http://jsonplaceholder.typicode.com/posts/', {
              title: this.createTitle,
              body: this.createBody
            }).then((response) => {
              this.posts.unshift(response.data)
            })
          },
          changePost(id, title, body) {
            axios.put('http://jsonplaceholder.typicode.com/posts/' + id, {
              title: title,
              body: body
            })
          },
  }

  }
