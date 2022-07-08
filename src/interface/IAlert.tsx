export default interface IAlert {
    showAlert: boolean
    header?: string
    message?: string
    type?: string
    onDidDismiss?: () => void
    okClick?: () => void
}