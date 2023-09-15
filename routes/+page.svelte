
<script>
    import axios from 'axios'
	import { onMount } from 'svelte';
    var kutya = '', mind = []
    onMount(() => {
        axios
            .get('http://localhost:3000/getall')
            .then(v => mind = v.data.kutyak)
    })
</script>
<div class="mc">
    <h1>Kutyanyilvántartó</h1>
    <input type="text" bind:value={kutya}>
    <button on:click={() => {
        axios.post('http://localhost:3000', { kutya }).then(v => {
            if (v.data.ok) {
                mind.push({nev: kutya})
                mind = mind
                kutya = ''
            }
        })
    }}>Kutya beküldése</button>
    <br><br>
    <div class="kl">
        {#each mind as kutya}
            <div>{kutya.nev}</div>
        {/each}
    </div>
</div>

<style>
    * {
        font-size: 30px;
    }
    div.mc {
        text-align: center;
    }
    div.kl div {
        background-color: antiquewhite;
        display: inline-block;
        writing-mode: vertical-lr;
        height: 100px;
        padding: 20px;
        margin: 5px;
        border-radius: 10px;
        box-shadow: 1px 1px 4px inset black;
    }
    div.kl div:nth-child(3n+2) {
        background-color: aquamarine;
    }
    div.kl div:nth-child(3n+1) {
        background-color: pink;
    }
</style>