//Formating date and time
const formatDuration = (sec: number) => {
  const minutes = Math.floor(sec / 60)
  const secs = Math.floor(sec % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

const formatDate = (d: string) => {
  if (!d) return '-'
  const date = new Date(d)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export { formatDate, formatDuration }
