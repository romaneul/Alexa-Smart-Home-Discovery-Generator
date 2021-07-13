<script>
  import { Router, Link, Route } from "svelte-routing";
</script>

<nav>
  <div class="nav-wrapper">
    <div class="container">
      <Link to="/" class="brand-logo">Alexa Smart Home Tools</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/">Discovery Generator</Link></li>
        <!-- <li><Link to="/">Utterance Validator</Link></li> -->
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  </div>
</nav>
