
const date = new Date()

const date2 = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

const date3 = new Date('08:22:12')

console.log(date2.toISOString())
console.log(date.toISOString())
console.log(date)
console.log(date3)
