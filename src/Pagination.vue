<template>
  <div id="app">
    <div class="smallfon">
      <div class="blocktwitter"><img src="src/assets/twitter.png"  class="twitter"/></div>
      <div class="addTextPost">Add a post</div>
      <input type="text" v-model="createTitle" class="created"/>
      <input type="text" v-model="createBody" class="created"/>
      <div><button  @click="addPost()" class="addPost">AddPost</button></div>
    <div class="post1">
      <div class="yourPosts">Your Posts</div>
      <input type="text" v-model="search" autofocus />
      <ul>
        <li v-for="(post, index) of filteredAndOrdered" class="post">
          <p><span class="boldText">Title:</span> {{ post.title }}</p>
          <p><span class="boldText">Content:</span> {{ post.body }}</p>
          <button  @click="deleteData(index, post.id)" class="buttonDelete">Delete</button>
          <button @click="visiblePostID = post.id" class="buttonChange">Change</button>
          <div v-if="visiblePostID === post.id" class="modalWindow">
          <div><input  v-model="post.title" class="changePost"><input  v-model="post.body" class="changePost"></div>
          <button type="button" @click="changePost(post.id, post.title, post.body)" class="apply">To apply</button>
        </div>
        </li>
      </ul>
      <div class="allpagination">
        <button type="button" @click="page -=1" v-if="page > 0" class="prev"><<</button>
    <div class="pagin">
      <button class="item"
              v-for="n in evenPosts"
              :key="n.id"
              v-bind:class="{'selected': current === n.id}"
              @click="page=n-1">{{ n }} </button>
    </div>
        <button type="button" @click="page +=1" class="next" v-if="page < evenPosts-1">>></button>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  el: "#app",
  data () {
    return {
      search: '',
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
        return _.orderBy(this.posts.slice(start, end), 'name');
      },
      filteredPosts() {
        return this.posts.filter((post) => {
          return post.title.match(this.search);
        });
      },
      filteredAndOrdered: function() {
        const filtered = this.posts.filter(post =>
           post.title.match(this.search)
        );
        const start = this.page * 10;
        const end = start + 10;
        return _.orderBy(this.posts.slice(start, end), 'name');
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
</script>

<style>
    #app{
      background-image: url(assets/fon.jpg);
      /* background-size: cover; */
    }

    .smallfon{
      background-image: url(assets/mainfon1.jpg);

      width: 700px;
      margin: auto;
    }

    .twitter{
      width: 200px;
      height: 100px;
    }

    .addTextPost{
      margin: 0px 0px 5px 290px;
      color: #BCD2FC;
        /* color: #545D66; */
      font-size: 25px;
      font-weight: 700;
    }

    .blocktwitter{
      margin: 10px;
      width: 100px;
      height: 100px;
      margin: -20px 0px 0px 30px;
    }

    .created{
      width: 340px;
      height: 50px;
      font-size: 20px;
    }

    .addPost {
      position: relative;
      display: inline-block;
      font-size: 90%;
      font-weight: 700;
      color: rgb(209,209,217);
      text-decoration: none;
      text-shadow: 0 -1px 2px rgba(0,0,0,.2);
      padding: .5em 1em;
      outline: none;
      width: 350px;
      margin: 10px 0px 10px 170px;
      border-radius: 3px;
      background: #2278BA;
      box-shadow:
       0 1px rgba(255,255,255,.2) inset,
       0 3px 5px rgba(0,1,6,.5),
       0 0 1px 1px rgba(0,1,6,.2);
      transition: .2s ease-in-out;
    }
    .addPost:hover:not(:active) {
      background: #2FA5BA;
    }
    .addPost:active {
      top: 1px;
      box-shadow:
       0 0 1px rgba(0,0,0,.5) inset,
       0 2px 3px rgba(0,0,0,.5) inset,
       0 1px 1px rgba(255,255,255,.1);
    }

    .post1{
      background-color: #FFFFFF;
      border-radius: 10px;
      border: 2px solid #91C1DC;
      width: 670px;
      margin-left: 15px;
    }

    .yourPosts{
      border-radius: 7px 7px 0px 0px;
      font-size: 25px;
      font-weight: bold;
      text-align: left;
      color: #4A535C;
      background-color: #91C1DC;
      padding: 5px 0px 5px 15px;
    }

    .boldText{
      font-weight: bold;
    }

    .post{
      height: 180px;
      margin-right: 40px;
      border-bottom: 1px solid #4A535C;

    }

    .buttonDelete{
      background-color: white;
      color: #38414A;
      border: 2px solid #A52A2A;
      font-weight: 550;
      font-size: 17px;
      border-radius: 2px;
      box-shadow: -1px 3px 28px 6px rgba(0,0,0,0.17);
      margin-right: 10px;
      transition-duration: 0.6s;
      float: left;
    }

    .buttonDelete:hover{
      background-color: #A52A2A;
      color: white;
      transition-duration: 0.6s;
    }

    .buttonChange{
      background-color: #3C97E1;
      color: #38414A;
      border: 2px solid #3C97E1;
      font-weight: 550;
      font-size: 17px;
      border-radius: 2px;
      box-shadow: -1px 3px 28px 6px rgba(0,0,0,0.17);
      margin-right: 10px;
      float: left;
      position: relative;
    }

    .buttonChange:hover{
      background-color: white;
      color: black;
      transition-duration: 0.6s;
    }

    .modalWindow{
    margin-left: 50px;
    }

    .changePost{
      width: 195px;
      margin-right: 6px;
      height: 30px;
    box-shadow: -1px 3px 19px -7px rgba(0,0,0,0.13);
    }

    .apply{
      margin: 10px 0px 0px 410px;
        background-color: #4CAF50;
        color: #000000;
        font-size: 18px;
        box-shadow: -1px 3px 28px 6px rgba(0,0,0,0.17);
        transition-duration: 0.6s;
        border-radius: 1px;
        border: 1px solid #949494;
      }

      .apply:hover{
        background-color: #4CAF50;
        color: white;

      }

      .prev{
        float: left;
        position: absolute;
        margin-left: 50px;
      }

      .next{
        margin-left: 540px;
        position: absolute;
        }

      .item{
        display: inline-block;
      width: 25px;
      height: 20px;
      margin: 0px 10px 0px 10px;

      text-align: center;
      border: solid 1px #333;
      cursor: pointer;
      transition: background .3s;
      }
      .selected{
        background: #ccc;
    }

    .pagin{
      margin-left: 90px;
      float: left;
      position: absolute;
    }
    .allpagination{
      padding-top: 10px;
      height: 40px;
    }
</style>
