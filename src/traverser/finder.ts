import ts from 'typescript/lib/typescript'

import { traverse } from './traverser'

export const findNodes = <T extends ts.Node>(
  root: ts.Node,
  kind: ts.SyntaxKind
): T[] => {
  const result: T[] = []
  traverse(root, node => {
    if (node.kind === kind) {
      result.push(<T>node)
    }
  })
  return result
}

export function findNumericLiteral(root: ts.Node) {
  return findNodes<ts.NumericLiteral>(root, ts.SyntaxKind.NumericLiteral)
}
export function findBigIntLiteral(root: ts.Node) {
  return findNodes<ts.BigIntLiteral>(root, ts.SyntaxKind.BigIntLiteral)
}
export function findStringLiteral(root: ts.Node) {
  return findNodes<ts.StringLiteral>(root, ts.SyntaxKind.StringLiteral)
}
export function findJsxText(root: ts.Node) {
  return findNodes<ts.JsxText>(root, ts.SyntaxKind.JsxText)
}
export function findRegularExpressionLiteral(root: ts.Node) {
  return findNodes<ts.RegularExpressionLiteral>(
    root,
    ts.SyntaxKind.RegularExpressionLiteral
  )
}
export function findNoSubstitutionTemplateLiteral(root: ts.Node) {
  return findNodes<ts.NoSubstitutionTemplateLiteral>(
    root,
    ts.SyntaxKind.NoSubstitutionTemplateLiteral
  )
}
export function findTemplateHead(root: ts.Node) {
  return findNodes<ts.TemplateHead>(root, ts.SyntaxKind.TemplateHead)
}
export function findTemplateMiddle(root: ts.Node) {
  return findNodes<ts.TemplateMiddle>(root, ts.SyntaxKind.TemplateMiddle)
}
export function findTemplateTail(root: ts.Node) {
  return findNodes<ts.TemplateTail>(root, ts.SyntaxKind.TemplateTail)
}
export function findIdentifier(root: ts.Node) {
  return findNodes<ts.Identifier>(root, ts.SyntaxKind.Identifier)
}
export function findPrivateIdentifier(root: ts.Node) {
  return findNodes<ts.PrivateIdentifier>(root, ts.SyntaxKind.PrivateIdentifier)
}
export function findQualifiedName(root: ts.Node) {
  return findNodes<ts.QualifiedName>(root, ts.SyntaxKind.QualifiedName)
}
export function findComputedPropertyName(root: ts.Node) {
  return findNodes<ts.ComputedPropertyName>(
    root,
    ts.SyntaxKind.ComputedPropertyName
  )
}
export function findDecorator(root: ts.Node) {
  return findNodes<ts.Decorator>(root, ts.SyntaxKind.Decorator)
}
export function findPropertySignature(root: ts.Node) {
  return findNodes<ts.PropertySignature>(root, ts.SyntaxKind.PropertySignature)
}
export function findPropertyDeclaration(root: ts.Node) {
  return findNodes<ts.PropertyDeclaration>(
    root,
    ts.SyntaxKind.PropertyDeclaration
  )
}
export function findMethodSignature(root: ts.Node) {
  return findNodes<ts.MethodSignature>(root, ts.SyntaxKind.MethodSignature)
}
export function findMethodDeclaration(root: ts.Node) {
  return findNodes<ts.MethodDeclaration>(root, ts.SyntaxKind.MethodDeclaration)
}
export function findNamedTupleMember(root: ts.Node) {
  return findNodes<ts.NamedTupleMember>(root, ts.SyntaxKind.NamedTupleMember)
}
export function findTemplateLiteralTypeSpan(root: ts.Node) {
  return findNodes<ts.TemplateLiteralTypeSpan>(
    root,
    ts.SyntaxKind.TemplateLiteralTypeSpan
  )
}
export function findObjectBindingPattern(root: ts.Node) {
  return findNodes<ts.ObjectBindingPattern>(
    root,
    ts.SyntaxKind.ObjectBindingPattern
  )
}
export function findArrayBindingPattern(root: ts.Node) {
  return findNodes<ts.ArrayBindingPattern>(
    root,
    ts.SyntaxKind.ArrayBindingPattern
  )
}
export function findBindingElement(root: ts.Node) {
  return findNodes<ts.BindingElement>(root, ts.SyntaxKind.BindingElement)
}
export function findArrayLiteralExpression(root: ts.Node) {
  return findNodes<ts.ArrayLiteralExpression>(
    root,
    ts.SyntaxKind.ArrayLiteralExpression
  )
}
export function findObjectLiteralExpression(root: ts.Node) {
  return findNodes<ts.ObjectLiteralExpression>(
    root,
    ts.SyntaxKind.ObjectLiteralExpression
  )
}
export function findPropertyAccessExpression(root: ts.Node) {
  return findNodes<ts.PropertyAccessExpression>(
    root,
    ts.SyntaxKind.PropertyAccessExpression
  )
}
export function findElementAccessExpression(root: ts.Node) {
  return findNodes<ts.ElementAccessExpression>(
    root,
    ts.SyntaxKind.ElementAccessExpression
  )
}
export function findCallExpression(root: ts.Node) {
  return findNodes<ts.CallExpression>(root, ts.SyntaxKind.CallExpression)
}
export function findNewExpression(root: ts.Node) {
  return findNodes<ts.NewExpression>(root, ts.SyntaxKind.NewExpression)
}
export function findTaggedTemplateExpression(root: ts.Node) {
  return findNodes<ts.TaggedTemplateExpression>(
    root,
    ts.SyntaxKind.TaggedTemplateExpression
  )
}
export function findParenthesizedExpression(root: ts.Node) {
  return findNodes<ts.ParenthesizedExpression>(
    root,
    ts.SyntaxKind.ParenthesizedExpression
  )
}
export function findFunctionExpression(root: ts.Node) {
  return findNodes<ts.FunctionExpression>(
    root,
    ts.SyntaxKind.FunctionExpression
  )
}
export function findArrowFunction(root: ts.Node) {
  return findNodes<ts.ArrowFunction>(root, ts.SyntaxKind.ArrowFunction)
}
export function findDeleteExpression(root: ts.Node) {
  return findNodes<ts.DeleteExpression>(root, ts.SyntaxKind.DeleteExpression)
}
export function findTypeOfExpression(root: ts.Node) {
  return findNodes<ts.TypeOfExpression>(root, ts.SyntaxKind.TypeOfExpression)
}
export function findVoidExpression(root: ts.Node) {
  return findNodes<ts.VoidExpression>(root, ts.SyntaxKind.VoidExpression)
}
export function findAwaitExpression(root: ts.Node) {
  return findNodes<ts.AwaitExpression>(root, ts.SyntaxKind.AwaitExpression)
}
export function findPrefixUnaryExpression(root: ts.Node) {
  return findNodes<ts.PrefixUnaryExpression>(
    root,
    ts.SyntaxKind.PrefixUnaryExpression
  )
}
export function findPostfixUnaryExpression(root: ts.Node) {
  return findNodes<ts.PostfixUnaryExpression>(
    root,
    ts.SyntaxKind.PostfixUnaryExpression
  )
}
export function findBinaryExpression(root: ts.Node) {
  return findNodes<ts.BinaryExpression>(root, ts.SyntaxKind.BinaryExpression)
}
export function findConditionalExpression(root: ts.Node) {
  return findNodes<ts.ConditionalExpression>(
    root,
    ts.SyntaxKind.ConditionalExpression
  )
}
export function findTemplateExpression(root: ts.Node) {
  return findNodes<ts.TemplateExpression>(
    root,
    ts.SyntaxKind.TemplateExpression
  )
}
export function findYieldExpression(root: ts.Node) {
  return findNodes<ts.YieldExpression>(root, ts.SyntaxKind.YieldExpression)
}
export function findSpreadElement(root: ts.Node) {
  return findNodes<ts.SpreadElement>(root, ts.SyntaxKind.SpreadElement)
}
export function findClassExpression(root: ts.Node) {
  return findNodes<ts.ClassExpression>(root, ts.SyntaxKind.ClassExpression)
}
export function findOmittedExpression(root: ts.Node) {
  return findNodes<ts.OmittedExpression>(root, ts.SyntaxKind.OmittedExpression)
}
export function findExpressionWithTypeArguments(root: ts.Node) {
  return findNodes<ts.ExpressionWithTypeArguments>(
    root,
    ts.SyntaxKind.ExpressionWithTypeArguments
  )
}
export function findAsExpression(root: ts.Node) {
  return findNodes<ts.AsExpression>(root, ts.SyntaxKind.AsExpression)
}
export function findNonNullExpression(root: ts.Node) {
  return findNodes<ts.NonNullExpression>(root, ts.SyntaxKind.NonNullExpression)
}
export function findMetaProperty(root: ts.Node) {
  return findNodes<ts.MetaProperty>(root, ts.SyntaxKind.MetaProperty)
}
export function findSyntheticExpression(root: ts.Node) {
  return findNodes<ts.SyntheticExpression>(
    root,
    ts.SyntaxKind.SyntheticExpression
  )
}
export function findTemplateSpan(root: ts.Node) {
  return findNodes<ts.TemplateSpan>(root, ts.SyntaxKind.TemplateSpan)
}
export function findSemicolonClassElement(root: ts.Node) {
  return findNodes<ts.SemicolonClassElement>(
    root,
    ts.SyntaxKind.SemicolonClassElement
  )
}
export function findBlock(root: ts.Node) {
  return findNodes<ts.Block>(root, ts.SyntaxKind.Block)
}
export function findEmptyStatement(root: ts.Node) {
  return findNodes<ts.EmptyStatement>(root, ts.SyntaxKind.EmptyStatement)
}
export function findVariableStatement(root: ts.Node) {
  return findNodes<ts.VariableStatement>(root, ts.SyntaxKind.VariableStatement)
}
export function findExpressionStatement(root: ts.Node) {
  return findNodes<ts.ExpressionStatement>(
    root,
    ts.SyntaxKind.ExpressionStatement
  )
}
export function findIfStatement(root: ts.Node) {
  return findNodes<ts.IfStatement>(root, ts.SyntaxKind.IfStatement)
}
export function findDoStatement(root: ts.Node) {
  return findNodes<ts.DoStatement>(root, ts.SyntaxKind.DoStatement)
}
export function findWhileStatement(root: ts.Node) {
  return findNodes<ts.WhileStatement>(root, ts.SyntaxKind.WhileStatement)
}
export function findForStatement(root: ts.Node) {
  return findNodes<ts.ForStatement>(root, ts.SyntaxKind.ForStatement)
}
export function findForInStatement(root: ts.Node) {
  return findNodes<ts.ForInStatement>(root, ts.SyntaxKind.ForInStatement)
}
export function findForOfStatement(root: ts.Node) {
  return findNodes<ts.ForOfStatement>(root, ts.SyntaxKind.ForOfStatement)
}
export function findContinueStatement(root: ts.Node) {
  return findNodes<ts.ContinueStatement>(root, ts.SyntaxKind.ContinueStatement)
}
export function findBreakStatement(root: ts.Node) {
  return findNodes<ts.BreakStatement>(root, ts.SyntaxKind.BreakStatement)
}
export function findReturnStatement(root: ts.Node) {
  return findNodes<ts.ReturnStatement>(root, ts.SyntaxKind.ReturnStatement)
}
export function findWithStatement(root: ts.Node) {
  return findNodes<ts.WithStatement>(root, ts.SyntaxKind.WithStatement)
}
export function findSwitchStatement(root: ts.Node) {
  return findNodes<ts.SwitchStatement>(root, ts.SyntaxKind.SwitchStatement)
}
export function findLabeledStatement(root: ts.Node) {
  return findNodes<ts.LabeledStatement>(root, ts.SyntaxKind.LabeledStatement)
}
export function findThrowStatement(root: ts.Node) {
  return findNodes<ts.ThrowStatement>(root, ts.SyntaxKind.ThrowStatement)
}
export function findTryStatement(root: ts.Node) {
  return findNodes<ts.TryStatement>(root, ts.SyntaxKind.TryStatement)
}
export function findDebuggerStatement(root: ts.Node) {
  return findNodes<ts.DebuggerStatement>(root, ts.SyntaxKind.DebuggerStatement)
}
export function findVariableDeclaration(root: ts.Node) {
  return findNodes<ts.VariableDeclaration>(
    root,
    ts.SyntaxKind.VariableDeclaration
  )
}
export function findVariableDeclarationList(root: ts.Node) {
  return findNodes<ts.VariableDeclarationList>(
    root,
    ts.SyntaxKind.VariableDeclarationList
  )
}
export function findFunctionDeclaration(root: ts.Node) {
  return findNodes<ts.FunctionDeclaration>(
    root,
    ts.SyntaxKind.FunctionDeclaration
  )
}
export function findClassDeclaration(root: ts.Node) {
  return findNodes<ts.ClassDeclaration>(root, ts.SyntaxKind.ClassDeclaration)
}
export function findInterfaceDeclaration(root: ts.Node) {
  return findNodes<ts.InterfaceDeclaration>(
    root,
    ts.SyntaxKind.InterfaceDeclaration
  )
}
export function findTypeAliasDeclaration(root: ts.Node) {
  return findNodes<ts.TypeAliasDeclaration>(
    root,
    ts.SyntaxKind.TypeAliasDeclaration
  )
}
export function findEnumDeclaration(root: ts.Node) {
  return findNodes<ts.EnumDeclaration>(root, ts.SyntaxKind.EnumDeclaration)
}
export function findModuleDeclaration(root: ts.Node) {
  return findNodes<ts.ModuleDeclaration>(root, ts.SyntaxKind.ModuleDeclaration)
}
export function findModuleBlock(root: ts.Node) {
  return findNodes<ts.ModuleBlock>(root, ts.SyntaxKind.ModuleBlock)
}
export function findCaseBlock(root: ts.Node) {
  return findNodes<ts.CaseBlock>(root, ts.SyntaxKind.CaseBlock)
}
export function findNamespaceExportDeclaration(root: ts.Node) {
  return findNodes<ts.NamespaceExportDeclaration>(
    root,
    ts.SyntaxKind.NamespaceExportDeclaration
  )
}
export function findImportEqualsDeclaration(root: ts.Node) {
  return findNodes<ts.ImportEqualsDeclaration>(
    root,
    ts.SyntaxKind.ImportEqualsDeclaration
  )
}
export function findImportDeclaration(root: ts.Node) {
  return findNodes<ts.ImportDeclaration>(root, ts.SyntaxKind.ImportDeclaration)
}
export function findImportClause(root: ts.Node) {
  return findNodes<ts.ImportClause>(root, ts.SyntaxKind.ImportClause)
}
export function findNamespaceImport(root: ts.Node) {
  return findNodes<ts.NamespaceImport>(root, ts.SyntaxKind.NamespaceImport)
}
export function findNamedImports(root: ts.Node) {
  return findNodes<ts.NamedImports>(root, ts.SyntaxKind.NamedImports)
}
export function findImportSpecifier(root: ts.Node) {
  return findNodes<ts.ImportSpecifier>(root, ts.SyntaxKind.ImportSpecifier)
}
export function findExportAssignment(root: ts.Node) {
  return findNodes<ts.ExportAssignment>(root, ts.SyntaxKind.ExportAssignment)
}
export function findExportDeclaration(root: ts.Node) {
  return findNodes<ts.ExportDeclaration>(root, ts.SyntaxKind.ExportDeclaration)
}
export function findNamedExports(root: ts.Node) {
  return findNodes<ts.NamedExports>(root, ts.SyntaxKind.NamedExports)
}
export function findNamespaceExport(root: ts.Node) {
  return findNodes<ts.NamespaceExport>(root, ts.SyntaxKind.NamespaceExport)
}
export function findExportSpecifier(root: ts.Node) {
  return findNodes<ts.ExportSpecifier>(root, ts.SyntaxKind.ExportSpecifier)
}
export function findMissingDeclaration(root: ts.Node) {
  return findNodes<ts.MissingDeclaration>(
    root,
    ts.SyntaxKind.MissingDeclaration
  )
}
export function findExternalModuleReference(root: ts.Node) {
  return findNodes<ts.ExternalModuleReference>(
    root,
    ts.SyntaxKind.ExternalModuleReference
  )
}
export function findJsxElement(root: ts.Node) {
  return findNodes<ts.JsxElement>(root, ts.SyntaxKind.JsxElement)
}
export function findJsxSelfClosingElement(root: ts.Node) {
  return findNodes<ts.JsxSelfClosingElement>(
    root,
    ts.SyntaxKind.JsxSelfClosingElement
  )
}
export function findJsxOpeningElement(root: ts.Node) {
  return findNodes<ts.JsxOpeningElement>(root, ts.SyntaxKind.JsxOpeningElement)
}
export function findJsxClosingElement(root: ts.Node) {
  return findNodes<ts.JsxClosingElement>(root, ts.SyntaxKind.JsxClosingElement)
}
export function findJsxFragment(root: ts.Node) {
  return findNodes<ts.JsxFragment>(root, ts.SyntaxKind.JsxFragment)
}
export function findJsxOpeningFragment(root: ts.Node) {
  return findNodes<ts.JsxOpeningFragment>(
    root,
    ts.SyntaxKind.JsxOpeningFragment
  )
}
export function findJsxClosingFragment(root: ts.Node) {
  return findNodes<ts.JsxClosingFragment>(
    root,
    ts.SyntaxKind.JsxClosingFragment
  )
}
export function findJsxAttribute(root: ts.Node) {
  return findNodes<ts.JsxAttribute>(root, ts.SyntaxKind.JsxAttribute)
}
export function findJsxAttributes(root: ts.Node) {
  return findNodes<ts.JsxAttributes>(root, ts.SyntaxKind.JsxAttributes)
}
export function findJsxSpreadAttribute(root: ts.Node) {
  return findNodes<ts.JsxSpreadAttribute>(
    root,
    ts.SyntaxKind.JsxSpreadAttribute
  )
}
export function findJsxExpression(root: ts.Node) {
  return findNodes<ts.JsxExpression>(root, ts.SyntaxKind.JsxExpression)
}
export function findCaseClause(root: ts.Node) {
  return findNodes<ts.CaseClause>(root, ts.SyntaxKind.CaseClause)
}
export function findDefaultClause(root: ts.Node) {
  return findNodes<ts.DefaultClause>(root, ts.SyntaxKind.DefaultClause)
}
export function findHeritageClause(root: ts.Node) {
  return findNodes<ts.HeritageClause>(root, ts.SyntaxKind.HeritageClause)
}
export function findCatchClause(root: ts.Node) {
  return findNodes<ts.CatchClause>(root, ts.SyntaxKind.CatchClause)
}
export function findPropertyAssignment(root: ts.Node) {
  return findNodes<ts.PropertyAssignment>(
    root,
    ts.SyntaxKind.PropertyAssignment
  )
}
export function findShorthandPropertyAssignment(root: ts.Node) {
  return findNodes<ts.ShorthandPropertyAssignment>(
    root,
    ts.SyntaxKind.ShorthandPropertyAssignment
  )
}
export function findSpreadAssignment(root: ts.Node) {
  return findNodes<ts.SpreadAssignment>(root, ts.SyntaxKind.SpreadAssignment)
}
export function findEnumMember(root: ts.Node) {
  return findNodes<ts.EnumMember>(root, ts.SyntaxKind.EnumMember)
}
export function findUnparsedPrologue(root: ts.Node) {
  return findNodes<ts.UnparsedPrologue>(root, ts.SyntaxKind.UnparsedPrologue)
}
export function findUnparsedPrepend(root: ts.Node) {
  return findNodes<ts.UnparsedPrepend>(root, ts.SyntaxKind.UnparsedPrepend)
}
export function findUnparsedSyntheticReference(root: ts.Node) {
  return findNodes<ts.UnparsedSyntheticReference>(
    root,
    ts.SyntaxKind.UnparsedSyntheticReference
  )
}
export function findSourceFile(root: ts.Node) {
  return findNodes<ts.SourceFile>(root, ts.SyntaxKind.SourceFile)
}
export function findBundle(root: ts.Node) {
  return findNodes<ts.Bundle>(root, ts.SyntaxKind.Bundle)
}
export function findUnparsedSource(root: ts.Node) {
  return findNodes<ts.UnparsedSource>(root, ts.SyntaxKind.UnparsedSource)
}
export function findInputFiles(root: ts.Node) {
  return findNodes<ts.InputFiles>(root, ts.SyntaxKind.InputFiles)
}
export function findJSDocTypeExpression(root: ts.Node) {
  return findNodes<ts.JSDocTypeExpression>(
    root,
    ts.SyntaxKind.JSDocTypeExpression
  )
}
export function findJSDocNameReference(root: ts.Node) {
  return findNodes<ts.JSDocNameReference>(
    root,
    ts.SyntaxKind.JSDocNameReference
  )
}
export function findJSDocText(root: ts.Node) {
  return findNodes<ts.JSDocText>(root, ts.SyntaxKind.JSDocText)
}
export function findJSDocTypeLiteral(root: ts.Node) {
  return findNodes<ts.JSDocTypeLiteral>(root, ts.SyntaxKind.JSDocTypeLiteral)
}
export function findJSDocSignature(root: ts.Node) {
  return findNodes<ts.JSDocSignature>(root, ts.SyntaxKind.JSDocSignature)
}
export function findJSDocLink(root: ts.Node) {
  return findNodes<ts.JSDocLink>(root, ts.SyntaxKind.JSDocLink)
}
export function findJSDocTag(root: ts.Node) {
  return findNodes<ts.JSDocTag>(root, ts.SyntaxKind.JSDocTag)
}
export function findJSDocAugmentsTag(root: ts.Node) {
  return findNodes<ts.JSDocAugmentsTag>(root, ts.SyntaxKind.JSDocAugmentsTag)
}
export function findJSDocImplementsTag(root: ts.Node) {
  return findNodes<ts.JSDocImplementsTag>(
    root,
    ts.SyntaxKind.JSDocImplementsTag
  )
}
export function findJSDocAuthorTag(root: ts.Node) {
  return findNodes<ts.JSDocAuthorTag>(root, ts.SyntaxKind.JSDocAuthorTag)
}
export function findJSDocClassTag(root: ts.Node) {
  return findNodes<ts.JSDocClassTag>(root, ts.SyntaxKind.JSDocClassTag)
}
export function findJSDocPublicTag(root: ts.Node) {
  return findNodes<ts.JSDocPublicTag>(root, ts.SyntaxKind.JSDocPublicTag)
}
export function findJSDocPrivateTag(root: ts.Node) {
  return findNodes<ts.JSDocPrivateTag>(root, ts.SyntaxKind.JSDocPrivateTag)
}
export function findJSDocProtectedTag(root: ts.Node) {
  return findNodes<ts.JSDocProtectedTag>(root, ts.SyntaxKind.JSDocProtectedTag)
}
export function findJSDocReadonlyTag(root: ts.Node) {
  return findNodes<ts.JSDocReadonlyTag>(root, ts.SyntaxKind.JSDocReadonlyTag)
}
export function findJSDocOverrideTag(root: ts.Node) {
  return findNodes<ts.JSDocOverrideTag>(root, ts.SyntaxKind.JSDocOverrideTag)
}
export function findJSDocCallbackTag(root: ts.Node) {
  return findNodes<ts.JSDocCallbackTag>(root, ts.SyntaxKind.JSDocCallbackTag)
}
export function findJSDocEnumTag(root: ts.Node) {
  return findNodes<ts.JSDocEnumTag>(root, ts.SyntaxKind.JSDocEnumTag)
}
export function findJSDocParameterTag(root: ts.Node) {
  return findNodes<ts.JSDocParameterTag>(root, ts.SyntaxKind.JSDocParameterTag)
}
export function findJSDocReturnTag(root: ts.Node) {
  return findNodes<ts.JSDocReturnTag>(root, ts.SyntaxKind.JSDocReturnTag)
}
export function findJSDocThisTag(root: ts.Node) {
  return findNodes<ts.JSDocThisTag>(root, ts.SyntaxKind.JSDocThisTag)
}
export function findJSDocTypeTag(root: ts.Node) {
  return findNodes<ts.JSDocTypeTag>(root, ts.SyntaxKind.JSDocTypeTag)
}
export function findJSDocTemplateTag(root: ts.Node) {
  return findNodes<ts.JSDocTemplateTag>(root, ts.SyntaxKind.JSDocTemplateTag)
}
export function findJSDocTypedefTag(root: ts.Node) {
  return findNodes<ts.JSDocTypedefTag>(root, ts.SyntaxKind.JSDocTypedefTag)
}
export function findJSDocSeeTag(root: ts.Node) {
  return findNodes<ts.JSDocSeeTag>(root, ts.SyntaxKind.JSDocSeeTag)
}
export function findJSDocPropertyTag(root: ts.Node) {
  return findNodes<ts.JSDocPropertyTag>(root, ts.SyntaxKind.JSDocPropertyTag)
}
export function findNotEmittedStatement(root: ts.Node) {
  return findNodes<ts.NotEmittedStatement>(
    root,
    ts.SyntaxKind.NotEmittedStatement
  )
}
export function findPartiallyEmittedExpression(root: ts.Node) {
  return findNodes<ts.PartiallyEmittedExpression>(
    root,
    ts.SyntaxKind.PartiallyEmittedExpression
  )
}
export function findCommaListExpression(root: ts.Node) {
  return findNodes<ts.CommaListExpression>(
    root,
    ts.SyntaxKind.CommaListExpression
  )
}
