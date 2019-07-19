
<template>
<div>


<slot name="setsElem"></slot>
<slot name="setsBlock"></slot>

<h2>{{this.$store.state.base.jumper.elements_data[this.elclass][this.eltype][this.elid]['0']['content']['shorttexts']}}</h2>

</div>
</template>

<script>
 
export default{
 
props: ['elclass', 'eltype', 'elid'],
 
 }
</script>