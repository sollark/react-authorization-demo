import Header from '@/cmps/Header'

export default function Missing() {
  console.log('Missing connected')
  return (
    <div>
      <Header />
      <h1>The page is not found!</h1>
    </div>
  )
}
