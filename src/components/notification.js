import {NotificationManager} from "react-notifications";

export function createNotification (type)  {
    // eslint-disable-next-line
    switch (type) {
        case 'info':
            NotificationManager.info('Jedna z wymaganych wartości Login lub Hasło jest pusta!', 'Puste pola');
            break;
        case 'Unauthorized':
            NotificationManager.error("Wprowadzono niepoprawne dane logowania sprawdź login i hasło.","Błędne dane logowania");
            break;
        case 'addExpense':
            NotificationManager.success("Twój wydatek został dodany.", "Gratulacje.");
            break;
        case 'noMoney':
            NotificationManager.warning("Twój wydatek nie został dodany.", "Brak tylu środków na koncie");
            break;
    }
};


