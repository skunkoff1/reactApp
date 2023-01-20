export const navBarStyles = {
    drawer : {
        width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#101f33',
            color: "#EBEBEB",
        },
        '& .Mui-selected' : {
            color: 'red'
        }
    },
    icons: {
        backgroundColor: '#101f33',
        color: "#EBEBEB",
    },
    text: {
        '& span' : {
            fontWeight: '500',
            fontSize: '16px'
        }
    }
}