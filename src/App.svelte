<script lang="ts">
  import "../node_modules/materialize-css/dist/css/materialize.min.css";
  import Navbar from "./layout/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import { Router, Route } from "svelte-routing";
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
</svelte:head>

<Router>
  <Navbar />
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
</Router>
