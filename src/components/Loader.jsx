function Loader() {
    return (
      <div style={styles.overlay}>
        <div style={styles.loader}></div>
      </div>
    );
  }
  
  const styles = {
    overlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(255,255,255,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    },
    loader: {
      border: "6px solid #f3f3f3",
      borderTop: "6px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite"
    }
  };
  
  export default Loader;