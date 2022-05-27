const getTraitTypeValue = (traitType, attributesJson = []) => {
    const val = attributesJson.find(attribute => {
        return attribute.trait_type === traitType;
    });
    if (!val) {
        console.log('trait not found: ', traitType);
    }
    return val?.value;
}

export default getTraitTypeValue;
