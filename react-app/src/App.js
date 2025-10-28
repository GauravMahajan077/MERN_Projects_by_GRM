import { motion } from 'framer-motion';  // Import as shown

function App() {
  return (
    <div className="App">
      <h1>Framer Motion Example</h1>
      <motion.div
        initial={{ x: 0 }}  // Starting position (left)
        animate={{ x: 100 }}  // Animate to right by 100px
        transition={{ duration: 1 }}  // Smooth over 1 second
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          margin: '20px'
        }}
      >
        {/* Optional content inside the box */}
      </motion.div>
    </div>
  );
}

export default App;