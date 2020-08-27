export function valueWithoutSign(value: string): string {
    return value.replace(/-|\+/, '');
}

export function valueWithSign(value: string, sign: string): string {
    if (value === '0' || value === '') {
        return value;
    }
    return `${sign}${value}`;
}

export function insertChatAtPosition(value: string, position: number, char: string): string {
    return valueWithoutSign(value.slice(0, position) + char + value.slice(position));
}

export function validateNextValue(nextValue: string): boolean {
    // handle [digit][dot][two digit]
    const regex = /^(0|[1-9]\d*)(\.([0-9]{1,2})?)?$/;
    return !regex.test(nextValue);
}
