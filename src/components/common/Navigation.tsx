import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../pages/Home'
import Main from '../../pages/Main'

function Navigation(): React.ReactElement {
  return (
    <>
      <Routes>
        <Route index path='/auth' element={<Main />} />
        <Route path='/home' element={<Home />} />
        <Route path='/*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </>
  )
}

export default Navigation
