import colors from "./colors";

export const globalStyles = {
    container: {
        display: 'flex',
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: '18px',
        color: '#333',
    },
    coloredText: {
        fontSize: '18px',
        color: colors.adstream,
    },
    paragraph: {
        marginVertical: '8px',
        lineHeight: '20px',
    },
    input: {
        borderWidth: '1px',
        borderColor: '#ddd',
        padding: '10px',
        fontSize: '18px',
        borderRadius: '6px',
        width: '80%',
        marginBottom: '10px',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: '10px',
        marginTop: '6px',
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.adstream,
        padding: '10px',
        borderRadius: '5px',
        margin: '10px',
        alignItems: 'center',
        boxShadow: '0px 2px 3px #333',
        height: '50px',
      },
      buttonText: {
        color: 'white',
        fontSize: '24px',
        fontWeight: '700',
      },
};
