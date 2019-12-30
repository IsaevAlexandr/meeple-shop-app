export const validationMessages = {
    notEmpty: 'Поле не должно быть пустым',
    capitalazeMessage: 'Слово должно начинаться с заглавной буквы',
};

export const rules: Record<string, (x?: string) => boolean> = {
    isEmpty: value => !value || value.length === 0,
    isCapitalazed: value => {
        if (value && value.length > 0 && value[0].toUpperCase() !== value[0]) {
            return true;
        }
        return false;
    },
};

export type ValidationShema = Record<
    string,
    {
        rule: (x?: string) => boolean;
        message: string;
    }[]
>;

// supports shemas with nested object fields: {a: b: [{rule: notNull, message: 'error'}]}
export const validate = (validationShema: ValidationShema) => (formValues: Object) =>
    Object.entries(validationShema).reduce((acc, [fieldName, rules]) => {
        // @ts-ignore
        acc[fieldName] = Array.isArray(rules)
            ? rules
                  .map(
                      ({ rule, message }) =>
                          rule(
                              // @ts-ignore
                              formValues[fieldName],
                          ) && message,
                  )
                  .filter(Boolean)
            : validate(rules)(
                  // @ts-ignore
                  formValues[fieldName] || {},
              );

        return acc;
    }, {});
