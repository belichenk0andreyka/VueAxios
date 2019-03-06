<template>
  <div id="app">
    <input type="text" v-model="createTitle" />
    <input type="text" v-model="createBody" />
    <button  @click="addPost()">AddPost</button>
    <ul>
      <li v-for="(post, index) of posts">
        <p>{{ post.title }}</p>
        <p>{{ post.body }}</p>
        <button  @click="deleteData(index, post.id)">Delete</button>
        <button @click="visiblePostID = post.id">
          Изменить
      </button>
      <transition v-if="visiblePostID === post.id">
        <p><input  v-model="post.title"><br><input  v-model="post.body">
        <button type="button" @click="changePost(post.id, post.title, post.body)">Применить</button></p>
      </transition>
      </li>
    </ul>
  </div>
</template>

<script>
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
</script>

<style>

</style>
