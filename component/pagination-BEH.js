export const Pagination = Behavior({
    data: {
        total: 0,
        resultList: []
    },
    methods: {
        setTotal(total) {
            this.setData({total})
        },
        setList(list) {
            this.setData({
                resultList: list
            })
        },
        getCurrentStart() {
            return this.data.resultList.length
        },
        hasMore() {
            return this.data.resultList.length < this.data.total
        },
        init() {
            this.setData({
                resultList: [],
                total: 0
            })
        }
    }
})