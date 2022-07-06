const FDUpgradeStudent = {
    username: {
        required: 'Username is a required field',
        pattern: {
            value: /[A-Za-z0-9 ]+$/i, // special carackter not allow
            message: 'Special charakter dan spasi dilarang'
        }
    },
    placeOfBirth: {
        required: 'wajib di isi',
        maxLength: {
            value: 48,
            message: "tidak boleh lebih dari 48 charackter"
        },
        pattern: {
            value: /[A-Za-z0-9 ]+$/i, // special carackter not allow
            message: 'Special charakter dilarang'
        }
    },
    birthDay: {
        required: "wajib di isi",
    },
    email: {
        required: "wajib di isi",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, // is email
            message: 'Format email tidak sesuai'
        }
    },
    nisn: {
        required: "wajib di isi",
        minLength: {
            value: 10,
            message: "NISN minimal 10 angka"
        },
        maxLength: {
            value: 10,
            message: "NISN maximal 10 angka"
        },
        valueAsNumber: true

    },
    studyAt: {
        required: "wajib di isi",
    },
    province: {
        required: "wajib di isi",
    }
}

export { FDUpgradeStudent }