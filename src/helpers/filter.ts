export function convertFilterObject(obj: Record<string, any>): Record<string, any> {
  const convertedObj: Record<string, any> = {};
  let lastKey: any;
  for (const key in obj) {
    const nestedKeys = key.split('.');
    lastKey = nestedKeys.pop();

    let currentObj = convertedObj;
    for (const nestedKey of nestedKeys) {
      if (!currentObj[nestedKey]) {
        currentObj[nestedKey] = {};
      }
      currentObj = currentObj[nestedKey];
    }

    currentObj[lastKey] = obj[key];
  }

  return convertedObj;
}

export const filterQueries = (queries: any[], filter: Record<string, any>): any[] => {
  const filteredQueries = queries.filter((video) => {
    for (const key in filter) {
      const nestedKeys = key.split('.');
      let currentObj = video;
      let filterKey1 = nestedKeys[0];
      let filterKey2 = nestedKeys[1];
      let value = filter[key];

      return (
        filterKey2 &&
        currentObj[filterKey1] &&
        currentObj[filterKey1][filterKey2] &&
        ((typeof currentObj[filterKey1][filterKey2] === 'string' &&
          currentObj[filterKey1][filterKey2].includes(value)) ||
          (typeof currentObj[filterKey1][filterKey2] !== 'string' &&
            currentObj[filterKey1][filterKey2] == value))
      );
    }
  });

  return filteredQueries;
};

export const getKeysFromNestedQueries = (filter: Record<string, any>): any[] => {
  const keys = [];

  for (const key in filter) {
    const nestedKeys = key.split('.');
    let filterKey = nestedKeys[0];
    keys.push(filterKey);
  }

  return keys;
};

export const nestedFilter = async (queries: any, query: any) => {
  const queryObj = { ...query };
  const keys = getKeysFromNestedQueries(query);
  if (Object.keys(query).filter((key) => key.includes('.')).length) {
    const Model = queries.mongooseCollection.conn.models[queries.mongooseCollection.modelName];
    try {
      const data = await Model.find().populate(keys);
      const filteredData = filterQueries(data, queryObj);
      queries = queries.find({
        _id: filteredData.map((item: any) => item._id.toString()),
      });
      console.log(filteredData.map((item: any) => item._id.toString()));
    } catch (error) {}
  }

  return queries;
};
