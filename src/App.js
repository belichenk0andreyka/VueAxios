import axios from 'axios';

export default {
  name: 'app',
  data () {

    return{
      counter: 1,
      zero: 0,
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
   methods: {
      getData() {
          axios.get('http://jsonplaceholder.typicode.com/posts?_start=${this.counter}+${this.zero}&_limit=10').then(response => {
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
      },
  }
