import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(2)
  }
}))

const MenuSection = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.section}>
      <Grid container direction="column" wrap="nowrap">
        {children}
      </Grid>
    </div>
  )
}

export default MenuSection
