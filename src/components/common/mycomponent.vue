
<div>{{formData}}</div>

<script>
export default {
    props: ['rowaa'],
    data() {
        return {
            formData:''
        }
    },
    created() {
      this.getData()  
    },
    watch : {
        'rowaa' : 'getData'
    },
    methods: {
        getData() {
            //从后台获取数据逻辑 model.CacheModel.get('api/' + this.rowaa + '.json')
            //通过this.rowaa就可以获取传过来的值
            this.formData = 333
        }
    }
}
</script>