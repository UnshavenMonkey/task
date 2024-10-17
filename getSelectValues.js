function getSelectsFromSchema(schema) {
  if (schema.properties.age_range_description.items.properties.value.anyOf[1].enum) {
    const ageRangeOptions = schema.properties.age_range_description.items.properties.value.anyOf[1].enum;
    ageRangeOptions.forEach(option => {
      $('#age_range_description').append(new Option(option, option));
    });
  }

  if (schema.properties.apparel_size.items.properties.size_system.enum) {
    const sizeSystemOptions = schema.properties.apparel_size.items.properties.size_system.enum;
    sizeSystemOptions.forEach((option, index ) => {
      $('#size_system').append(new Option(schema.properties.apparel_size.items.properties.size_system.enumNames[index], option));
    });
  }

  if (schema.properties.apparel_size.items.properties.size_class.enum) {
    const sizeClassOptions = schema.properties.apparel_size.items.properties.size_class.enum;
    sizeClassOptions.forEach((option, index ) => {
      $('#size_class').append(new Option(schema.properties.apparel_size.items.properties.size_class.enumNames[index], option));
    });
  }

  if (schema.properties.apparel_size.items.properties.size.enum) {
    const sizeOptions = schema.properties.apparel_size.items.properties.size.enum;
    sizeOptions.forEach((option, index ) => {
      $('#size').append(new Option(schema.properties.apparel_size.items.properties.size.enumNames[index], option));
    });
  }

  if (schema.properties.apparel_size.items.properties.size_to.enum) {
    const sizeToOptions = schema.properties.apparel_size.items.properties.size_to.enum;
    sizeToOptions.forEach((option, index ) => {
      $('#size_to').append(new Option(schema.properties.apparel_size.items.properties.size_to.enumNames[index], option));
    });
  }

  if (schema.properties.apparel_size.items.properties.body_type.enum) {
    const bodyTypeOptions = schema.properties.apparel_size.items.properties.body_type.enum;
    bodyTypeOptions.forEach((option, index ) => {
      $('#body_type').append(new Option(schema.properties.apparel_size.items.properties.body_type.enumNames[index], option));
    });
  }

  if (schema.properties.apparel_size.items.properties.height_type.enum) {
    const heightTypeOptions = schema.properties.apparel_size.items.properties.height_type.enum;
    heightTypeOptions.forEach((option, index ) => {
      $('#height_type').append(new Option(schema.properties.apparel_size.items.properties.height_type.enumNames[index], option));
    });
  }

  updateARDRelativeSelect($('#age_range_description').val(), schema)

  $('#age_range_description').on('change', function() {
    const selectedAgeRangeDescription = $(this).val();
    updateARDRelativeSelect(selectedAgeRangeDescription, schema)
    updateSizeClassRelativeSelect($('#size_class').val(), schema)
  });

  $('#size_class').on('change', function() {
    const selectedSizeClass = $(this).val();
    updateSizeClassRelativeSelect(selectedSizeClass, schema)
  });
}

function updateARDRelativeSelect(selectedAgeRangeDescription, schema) {
  if (schema && schema.allOf[0].if.properties.age_range_description.contains.properties.value.enum.includes(selectedAgeRangeDescription)) {
    const valueSizeClass = $('#size_class').val();

    $('#size_class').empty();
    schema.allOf[0].then.properties.apparel_size.items.properties.size_class.enum.forEach((option, index) => {
      const textIndex = schema.properties.apparel_size.items.properties.size_class.enum.indexOf(option)
      const text = schema.properties.apparel_size.items.properties.size_class.enumNames[textIndex]
      $('#size_class').append(new Option(text, option));
      if (valueSizeClass === option) {
        $('#size_class').val(valueSizeClass);
      }
    });
  } else if (schema.allOf[0].else.if.properties.age_range_description.contains.properties.value.enum.includes(selectedAgeRangeDescription)) {
    const valueSizeClass = $('#size_class').val();
    $('#size_class').empty();
    schema.allOf[0].else.then.properties.apparel_size.items.properties.size_class.enum.forEach(option => {
      const textIndex = schema.properties.apparel_size.items.properties.size_class.enum.indexOf(option)
      const text = schema.properties.apparel_size.items.properties.size_class.enumNames[textIndex]
      $('#size_class').append(new Option(text, option));
      if (valueSizeClass === option) {
        $('#size_class').val(valueSizeClass);
      }
    });
  } else {
    const valueSizeClass = $('#size_class').val();
    $('#size_class').empty();
    schema.allOf[0].else.else.else.properties.apparel_size.items.properties.size_class.enum.forEach(option => {
      const textIndex = schema.properties.apparel_size.items.properties.size_class.enum.indexOf(option)
      const text = schema.properties.apparel_size.items.properties.size_class.enumNames[textIndex]
      $('#size_class').append(new Option(text, option));
      if (valueSizeClass === option) {
        $('#size_class').val(valueSizeClass);
      }
    });
  }
}

function updateSizeClassRelativeSelect(selectedSizeClass, schema) {
  if (schema && schema.allOf[1].if.properties.apparel_size.items.allOf[0].properties.size_class.enum.includes(selectedSizeClass)) {
    $('#size').empty();
    schema.allOf[1].then.properties.apparel_size.items.properties.size.enum.forEach((option, index) => {
      const textIndex = schema.properties.apparel_size.items.properties.size.enum.indexOf(option)
      const text = schema.properties.apparel_size.items.properties.size.enumNames[textIndex]
      $('#size').append(new Option(text, option));
    });
  } else if (schema && schema.allOf[1].else.else.else.else.if.properties.apparel_size.items.allOf[0].properties.size_class.enum.includes(selectedSizeClass)) {
    $('#size').empty();
    schema.allOf[1].else.else.else.else.then.properties.apparel_size.items.properties.size.enum.forEach((option, index) => {
      const textIndex = schema.properties.apparel_size.items.properties.size.enum.indexOf(option)
      const text = schema.properties.apparel_size.items.properties.size.enumNames[textIndex]
      $('#size').append(new Option(text, option));
    })
  } else {
    $('#size').empty();
    const sizeOptions = schema.properties.apparel_size.items.properties.size.enum;
    sizeOptions.forEach((option, index ) => {
      $('#size').append(new Option(schema.properties.apparel_size.items.properties.size.enumNames[index], option));
    });
  }
}

$.getJSON('./schema.json', function(data) {
    getSelectsFromSchema(data);
});






