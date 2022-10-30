const getStyles = () => ({
  headerSection: {
    fontSize: 60,
    backgroundColor: 'yellow',
    textTransform: 'uppercase',
  }
})

const HeaderSection = () => {
  const styles = getStyles()

  return <h1 style={styles.headerSection}>People &amp; their Cars</h1>
}

export default HeaderSection
