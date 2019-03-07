import axios from 'axios';

export default {
  name: 'app',
  data () {

    return{
      posts: [],
      createTitle: '',
      createBody: '',
      visiblePostID: '',

    }
  },

    created(){
      axios.get('http://jsonplaceholder.typicode.com/posts').then(response => {
        this.posts = response.data
      })
    },
    methods: {
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
        }
      }
    }
