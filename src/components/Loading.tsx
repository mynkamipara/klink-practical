import { CircularProgress, Stack } from "@mui/material"

export const Loader = () => {
    return (
        <Stack alignItems={'center'} margin={'auto'} justifyContent={'center'}><CircularProgress color="secondary" /></Stack>
    )
}