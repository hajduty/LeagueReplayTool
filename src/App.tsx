import './App.css'
import { TimelineForm } from './Pages/Timeline'

function App() {
  return (
    <>
      <TimelineForm></TimelineForm>
      <div className='bg-mainbg flex h-full fixed w-full overflow-y-hidden drag-area border-0 rounded-none'>
      </div>
    </>
  )
}

export default App
