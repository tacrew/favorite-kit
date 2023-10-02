const categories = {
  features: '機能別コンポーネント',
  ui: '汎用コンポーネント',
  pages: 'ページ',
  icons: 'アイコン',
  layouts: 'レイアウト',
  app: 'アプリ固有',
  hoc: 'HOC',
};

module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'カテゴリはどれ？',
        choices: Object.keys(categories),
      },
      {
        type: 'input',
        name: 'dir',
        message: 'サブカテゴリは何？（ex: auth, ※空文字ならカテゴリ直下）',
      },
      {
        type: 'input',
        name: 'component_name',
        message: 'コンポーネント名は何？（ex: AuthLoginForm）',
      },
      {
        type: 'confirm',
        name: 'have_props',
        message: '引数は必要？',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name, dir, have_props } = answers;

      const sub_dir_path = `${dir ? `${dir}/` : ``}${component_name}`;
      const path = `${category}/${sub_dir_path}`;
      const abs_path = `src/components/${path}`;

      // props
      const props_name = have_props ? `${component_name}Props` : '';
      const props = have_props ? `{}: ${props_name}` : '';

      const storybook_title = `${categories[category]}/${sub_dir_path}`;
      return {
        ...answers,
        path,
        abs_path,
        props_name,
        props,
        storybook_title,
      };
    });
  },
};
