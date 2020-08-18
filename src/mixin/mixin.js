import parseQueryString from '@/lib/parse_query.js'

export default {
  data () {
    return {
      routes: parseQueryString(location.href),
      queryString: this.getQueryString()
    }
  },

  methods: {
    firstUpperCase (str) {
      return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase()
      })
    },

    getQueryString () {
      const queryString = parseQueryString(location.href)
      return Object.keys(queryString).map(function (key) { return key + '=' + queryString[key] }).join('&')
    }
  }
}
