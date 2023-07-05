import ListContainer from './components/ListContainer'

function App() {
  return (
    <main className="h-screen w-full bg-[#1e1e1e] flex p-8 justify-center flex-col items-center gap-8">
      <h1 className="text-white text-8xl font-bold">Todo App</h1>
      <ListContainer />
    </main>
  )
}

export default App
