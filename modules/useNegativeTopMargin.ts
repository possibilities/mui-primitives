import { makeStyles, Theme } from '@material-ui/core/styles'

const fromPairs = <S>(pairs: [string, S][]) => {
  const obj = {} as { [key: string]: S }
  pairs.forEach(([key, val]) => {
    obj[key] = val
  })
  return obj
}

const useNegativeTopMargin = makeStyles((theme: Theme) => ({
  root: (responsivePadding: number[]) => ({
    paddingTop: 1,
    ...fromPairs(
      responsivePadding.map((padding, index) => [
        theme.breakpoints.up(theme.breakpoints.keys[index]),
        {
          '&::before': {
            marginTop: theme.spacing(-padding) - 1,
            content: '""',
            display: 'block',
          },
        },
      ]),
    ),
  }),
}))

export default useNegativeTopMargin
