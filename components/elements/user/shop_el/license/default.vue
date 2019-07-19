
<template>
<div>

	<div>


		<slot name="setsElem"></slot>
		<slot name="setsBlock"></slot>

	</div>

	<div>

		<span>{{this.$store.state.base.jumper.elements_data[this.elclass][this.eltype][this.elid]['0']['el_name']}}</span>

	</div>

</div>
</template>

<script>
 
export default{
 
props: ['elclass', 'eltype', 'elid'],
 
 }
</script>